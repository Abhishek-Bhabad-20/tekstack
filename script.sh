#!/bin/bash

# Create directory and files
mkdir -p Mercuryproject
cd Mercuryproject

# Create module1
cat > module1 << EOF
Linux is an open source operating system
Linux is a Unix based operating system
The various Linux distributions are fedora, ubuntu, debian linux, etc.
EOF

# Create module2
cat > module2 << EOF
raj:500:admin:/home/raj:/bin/bash
ajay:600:user:/home/ajay:/bin/bash
dane:700:admin:/home/dane:/bin/sh
gokul:800:user:/home/gokul:/bin/sh
EOF

# Check module1 and copy lines containing operating system
if [ -f module1 ]; then
    grep "operating system" module1 > OSfile
    echo "Contents of OSfile:"
    cat OSfile
fi

# Check module2 and find admin users with sh login shell
if [ -f module2 ]; then
    awk -F: '$3=="admin" && $5=="/bin/sh" {print $1}' module2 > Adminusers
    echo "Admin users with sh shell:"
    cat Adminusers
fi

# Replace Linux with Unix and save to Unixfile
sed 's/Linux/Unix/g' module1 > Unixfile

echo "Script executed successfully."
