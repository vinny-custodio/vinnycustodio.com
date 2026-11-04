"""Create a portable current-version snapshot, excluding accounts and local files."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import zipfile
import argparse

ROOT = Path(__file__).resolve().parents[1]
ALLOWED = ['README.md', 'AGENTS.md', '.gitignore', 'dist', 'docs', 'scripts', 'tests']

def create_backup(destination):
    files = []
    for name in ALLOWED:
        path = ROOT / name
        candidates = path.rglob('*') if path.is_dir() else [path]
        for candidate in candidates:
            rel = candidate.relative_to(ROOT)
            if candidate.is_symlink():
                raise ValueError(f'Symlinks are not supported: {rel}')
            if not candidate.is_file() or any(part in {'.DS_Store', '__pycache__', '.git', 'node_modules'} or part.startswith('.env') for part in rel.parts):
                continue
            files.append((rel.as_posix(), candidate.read_bytes()))
    destination.parent.mkdir(parents=True, exist_ok=True)
    checksums = {name: hashlib.sha256(data).hexdigest() for name, data in sorted(files)}
    with zipfile.ZipFile(destination, 'w', zipfile.ZIP_DEFLATED) as archive:
        for name, data in files:
            archive.writestr('vinny-portfolio/' + name, data)
        archive.writestr('vinny-portfolio/SHA256SUMS.json', json.dumps(checksums, indent=2) + '\n')
    return len(files)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    destination = args.output or ROOT / 'backups' / ('vinny-portfolio-' + datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S') + '.zip')
    count = create_backup(destination)
    print(f'Created {destination.resolve()} ({count} files)')
