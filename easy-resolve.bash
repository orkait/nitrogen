#!/bin/bash

# Function to remove all node_modules directories recursively
function remove_node_modules() {
    # Find all directories named "node_modules" and remove them
    find . -name "node_modules" -type d -prune -exec echo "Removing {}" \; -exec rm -rf {} +
}

# Function to recursively find package.json files and run 'pnpm install'
function install_packages() {
    # Find all directories containing a package.json file, excluding node_modules
    find . -name "package.json" -not -path "*/node_modules/*" -exec dirname {} \; | while read -r dir; do
        echo "Entering directory: $dir"
        cd "$dir" || { echo "Failed to enter $dir"; exit 1; }
        # Run the pnpm install command
        echo "Running 'pnpm install' in $dir"
        pnpm install
        # Return to the previous directory
        cd - > /dev/null || { echo "Failed to return to previous directory"; exit 1; }
    done
}

# Run the functions synchronously
remove_node_modules
install_packages
