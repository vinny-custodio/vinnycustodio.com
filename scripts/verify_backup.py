"""Verify all snapshot entries and checksums without extracting the archive."""
import hashlib
import json
from pathlib import PurePosixPath
import sys
import zipfile

def verify(path):
    with zipfile.ZipFile(path) as archive:
        names = archive.namelist()
        if len(names) != len(set(names)):
            raise ValueError('Duplicate archive entries')
        for name in names:
            parts = PurePosixPath(name)
            if parts.is_absolute() or '..' in parts.parts or not name.startswith('vinny-portfolio/'):
                raise ValueError('Unexpected archive path: ' + name)
        checksums = json.loads(archive.read('vinny-portfolio/SHA256SUMS.json'))
        expected = {'vinny-portfolio/' + name for name in checksums} | {'vinny-portfolio/SHA256SUMS.json'}
        if set(names) != expected:
            raise ValueError('Missing or unlisted archive files')
        for name, expected_hash in checksums.items():
            if hashlib.sha256(archive.read('vinny-portfolio/' + name)).hexdigest() != expected_hash:
                raise ValueError('Checksum mismatch: ' + name)
        print(f'Backup verified: {len(checksums)} files; all SHA-256 checksums match.')

if __name__ == '__main__':
    verify(sys.argv[1])
