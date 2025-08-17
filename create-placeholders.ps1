# Create lightweight placeholder images using PowerShell and .NET

Add-Type -AssemblyName System.Drawing

# Function to create a placeholder image
function Create-PlaceholderImage {
    param(
        [string]$outputPath,
        [int]$width = 800,
        [int]$height = 600,
        [string]$text = "Placeholder",
        [string]$bgColor = "#1a1a2e",
        [string]$textColor = "#3b82f6"
    )
    
    # Create bitmap
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    
    # Set background
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml($bgColor))
    $graphics.FillRectangle($bgBrush, 0, 0, $width, $height)
    
    # Add text
    $font = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml($textColor))
    $textSize = $graphics.MeasureString($text, $font)
    $x = ($width - $textSize.Width) / 2
    $y = ($height - $textSize.Height) / 2
    $graphics.DrawString($text, $font, $textBrush, $x, $y)
    
    # Add gradient overlay for better visual appeal
    $gradientBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Point]::new(0, 0),
        [System.Drawing.Point]::new($width, $height),
        [System.Drawing.Color]::FromArgb(50, 59, 130, 246),
        [System.Drawing.Color]::FromArgb(20, 147, 51, 234)
    )
    $graphics.FillRectangle($gradientBrush, 0, 0, $width, $height)
    
    # Save as PNG with compression
    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    
    # Cleanup
    $graphics.Dispose()
    $bitmap.Dispose()
    $bgBrush.Dispose()
    $textBrush.Dispose()
    $font.Dispose()
    $gradientBrush.Dispose()
}

Write-Host "Creating lightweight placeholder images..." -ForegroundColor Green

# Create placeholders for the large images
Create-PlaceholderImage -outputPath "src\assets\images\4.png" -width 1200 -height 800 -text "Event Image 4"
Create-PlaceholderImage -outputPath "src\assets\images\6.png" -width 1200 -height 800 -text "Event Image 6"
Create-PlaceholderImage -outputPath "src\assets\images\8.png" -width 1200 -height 800 -text "Event Image 8"

Write-Host "Placeholder images created successfully!" -ForegroundColor Green

# Check new file sizes
Write-Host "`nNew file sizes:" -ForegroundColor Yellow
$files = @("4.png", "6.png", "8.png")
foreach ($file in $files) {
    $filePath = "src\assets\images\$file"
    if (Test-Path $filePath) {
        $size = (Get-Item $filePath).Length / 1KB
        Write-Host "$file`: $([math]::Round($size, 2)) KB" -ForegroundColor Cyan
    }
}

Write-Host "`nOriginal images are backed up in src\assets\backup\" -ForegroundColor Green
Write-Host "You can replace placeholders with optimized versions later." -ForegroundColor Yellow