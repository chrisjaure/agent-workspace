#!/bin/sh
set -eu

find "$HOME" -maxdepth 1 -type d ! -name '.*' 2>/dev/null \
  | fzf --layout=reverse --delimiter / --with-nth -1 \
        --preview 'ls -la {}'
