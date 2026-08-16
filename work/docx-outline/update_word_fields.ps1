param(
  [Parameter(Mandatory=$true)][string]$InputDocx
)

$word = $null
$doc = $null
try {
  $word = New-Object -ComObject Word.Application
  $word.Visible = $false
  $word.DisplayAlerts = 0
  $path = (Resolve-Path -LiteralPath $InputDocx).Path
  $doc = $word.Documents.Open($path, $false, $false)

  foreach ($toc in $doc.TablesOfContents) {
    $toc.Update() | Out-Null
  }
  $doc.Fields.Update() | Out-Null
  foreach ($section in $doc.Sections) {
    foreach ($header in $section.Headers) { $header.Range.Fields.Update() | Out-Null }
    foreach ($footer in $section.Footers) { $footer.Range.Fields.Update() | Out-Null }
  }
  $doc.Save()
}
finally {
  if ($doc -ne $null) { $doc.Close($true) }
  if ($word -ne $null) { $word.Quit() }
  if ($doc -ne $null) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($doc) | Out-Null }
  if ($word -ne $null) { [System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null }
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
