# Define the repository
$repo = "jigpx/react"

# Read the .env.local file and add each variable to GitHub
Get-Content .env.local | ForEach-Object {
    if ($_ -match "=") {
        $parts = $_ -split "="
        $key = $parts[0]
        $value = $parts[1]
        gh secret set $key -b"$value" -R $repo
    }
}