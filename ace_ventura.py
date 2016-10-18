import os
import sys

proper_args = False
if len(sys.argv):
    proper_args = True

if proper_args:
    path = sys.argv[1]
    ls_path = os.popen('ls {}'.format(path)).read()
    path_split = ls_path.split('\r')
    for app in path_split[0].split('\n'):
        os.system('python3 manage.py makemigrations {}'.format(app))
    os.system('python3 manage.py migrate')
