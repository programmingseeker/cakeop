
import os
import shutil
import re
import json

CURRENT_DIR = os.getcwd()
FRONTEND_DIR = os.path.join(CURRENT_DIR, "frontend")
BACKEND_DIR = os.path.join(CURRENT_DIR, "backend")
PROD_BUILD_DIR = os.path.join(CURRENT_DIR, "build")
FRONTEND_BUILD_DIR = os.path.join(FRONTEND_DIR, "build")
BACKEND_PUBLIC_DIR = os.path.join(BACKEND_DIR, "public")
BACKEND_DIST_DIR = os.path.join(BACKEND_DIR, "dist")
PROD_BUILD_PUBLIC_DIR = os.path.join(PROD_BUILD_DIR, "public")
PROD_HTML_FILE = os.path.join(PROD_BUILD_PUBLIC_DIR, "index.html")
PROD_START_JS_FILE = os.path.join(
    PROD_BUILD_PUBLIC_DIR, "static", "js", "startscript.js"
)
DOTENV_FILE = os.path.join(BACKEND_DIR, ".env")
BACKEND_PACKAGE_JSON = os.path.join(BACKEND_DIR, "package.json")
PROD_PACKAGE_JSON = os.path.join(PROD_BUILD_DIR, "package.json")

CYAN = "\033[96m"
CLEAR = "\033[0m"
GREEN = "\033[92m"
RED = "\033[31m"
YELLOW = "\033[93m"

print(f"{GREEN}Changing directory to {YELLOW}{FRONTEND_DIR}{CLEAR}")
os.chdir(FRONTEND_DIR)
print(f"{GREEN}running react build script{CLEAR}")
os.system("npm run build")
print(f"{GREEN}REACT BUILD COMPLETE{CLEAR}")
os.chdir(BACKEND_DIR)
print(f"{GREEN}Changing directory to {YELLOW}{BACKEND_DIR}{CLEAR}")
print(f"{GREEN}Compressing {YELLOW}app.js{CLEAR}")
os.system("parcel build app.js --target node")
print(f"{YELLOW}app.js{GREEN} Compression COMPLETE!!{CLEAR}")
if not os.path.isdir(PROD_BUILD_DIR):
    os.mkdir(PROD_BUILD_DIR)
    print(f"{YELLOW}build {GREEN} directory CREATED !!{CLEAR}")


if not os.path.isdir(PROD_BUILD_PUBLIC_DIR):
    os.mkdir(PROD_BUILD_PUBLIC_DIR)
    print(f"{YELLOW}public build{GREEN} directory CREATED !!{CLEAR}")


if os.path.isdir(BACKEND_DIST_DIR) and os.path.isdir(PROD_BUILD_DIR):
    for file in os.listdir(BACKEND_DIST_DIR):
        shutil.move(
            os.path.join(BACKEND_DIST_DIR, file), os.path.join(
                PROD_BUILD_DIR, file)
        )
    print(f"{GREEN}completed moving backend bundeled files{CLEAR}")


if os.path.isdir(FRONTEND_BUILD_DIR) and os.path.isdir(PROD_BUILD_PUBLIC_DIR):
    for files in os.listdir(FRONTEND_BUILD_DIR):
        print(f"{GREEN}moving {YELLOW}{files} {CLEAR}")
        try:
            shutil.move(os.path.join(FRONTEND_BUILD_DIR, files),
                        PROD_BUILD_PUBLIC_DIR)
        except shutil.Error:
            print("file already exist")

    print(f"{GREEN}completed moving frontend {YELLOW}build{CLEAR} files{CLEAR}")

# print(f"{GREEN}Modifying {YELLOW}{PROD_HTML_FILE}{CLEAR}")
# with open(PROD_HTML_FILE, "r+") as f:
#     data = f.read()
#     js_content = re.search(r"<script>(.*?)</script>", data)
#     js_string = js_content.group(1)
#     js_string_remove = js_content.group(0)
#     new_data = data.replace(
#         js_string_remove, f'<script src="/static/js/startscript.js"></script>'
#     )
#     with open(PROD_START_JS_FILE, "w") as js_start_script:
#         js_start_script.write(js_string)

# with open(PROD_HTML_FILE, "w") as f:
#     f.write(new_data)


# print(f"{GREEN}Copying {YELLOW}{DOTENV_FILE}{CLEAR}")
# shutil.copy2(DOTENV_FILE, PROD_BUILD_DIR)

# print(f"{GREEN}Updating {YELLOW}{PROD_PACKAGE_JSON}{CLEAR}")
# with open(BACKEND_PACKAGE_JSON, "r") as f:
#     data = json.load(f)
#     new_data = {}
#     for dataField in data.keys():
#         if dataField != "devDependencies":
#             new_data[dataField] = data[dataField]
#     with open(PROD_PACKAGE_JSON, "w") as f1:
#         f1.write(json.dumps(new_data))


print(f"{CYAN}CLEANING FILES annd Folders...{CLEAR}")
os.rmdir(BACKEND_DIST_DIR)
print(f"{RED}Removed {YELLOW}{BACKEND_DIST_DIR}{CLEAR}")
os.rmdir(FRONTEND_BUILD_DIR)
print(f"{RED}Removed {YELLOW}{FRONTEND_BUILD_DIR}{CLEAR}")

# print(f"{GREEN}Changing directory to{YELLOW}{PROD_BUILD_DIR}{CLEAR}")
# os.chdir(PROD_BUILD_DIR)
# print(f"{GREEN}Deploying to heroku...{CLEAR}")
# os.system("git add .")
# os.system('git commit -m "production build v4"')
# os.system("git push")
# print(f"{GREEN}Project deployed to heroku...{CLEAR}")
