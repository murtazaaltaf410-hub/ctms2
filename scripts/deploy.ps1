# Velora Gifts — Vercel deployment script
# Prerequisites: Vercel account (vercel.com), MongoDB Atlas database

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "`n=== Velora Gifts Deployment ===`n" -ForegroundColor Gold

# Check Vercel CLI login
$whoami = npx vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in to Vercel. Opening login..." -ForegroundColor Yellow
    npx vercel login
}

Write-Host "`nDeploying to Vercel production...`n" -ForegroundColor Cyan
npx vercel deploy --prod --yes

Write-Host "`n=== Post-deploy: set these env vars in Vercel Dashboard ===`n" -ForegroundColor Yellow
Write-Host @"
MONGODB_URI          = your MongoDB Atlas connection string
NEXTAUTH_SECRET      = run: openssl rand -base64 32
NEXTAUTH_URL         = your production URL (e.g. https://velora-gifts.vercel.app)
ADMIN_EMAIL          = admin@veloragifts.com
ADMIN_PASSWORD       = your secure admin password
NEXT_PUBLIC_WHATSAPP_NUMBER
NEXT_PUBLIC_INSTAGRAM_HANDLE
NEXT_PUBLIC_BUSINESS_EMAIL
NEXT_PUBLIC_BUSINESS_ADDRESS
"@

Write-Host "`nAfter setting env vars, redeploy: npx vercel deploy --prod --yes`n"
Write-Host "Seed database once: npm run seed`n"
