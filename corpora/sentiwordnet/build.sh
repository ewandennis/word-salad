#!/bin/sh

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

pushd $DIR

if [ ! -f SentiWordNet_3.0.0.tgz ]; then
  echo "Downloading SentiWordNet ..."
  wget http://sentiwordnet.isti.cnr.it/SentiWordNet_3.0.0.tgz
fi

echo "Building adjective noun database..."
tar xO < SentiWordNet_3.0.0.tgz > SentiWordNet.txt
node build.js SentiWordNet.txt db.json
rm SentiWordNet.txt

popd

echo "Done"

