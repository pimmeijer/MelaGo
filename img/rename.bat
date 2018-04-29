cd C:\Courses\Project 3\App\Code\img
setlocal enabledelayedexpansion
for %%a in (*.jpg) do (
set f=%%a
set f=!f^(=!
set f=!f^)=!
ren %%a !f!
)