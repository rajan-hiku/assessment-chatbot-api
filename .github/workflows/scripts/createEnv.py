import os

env_keys = list(dict(os.environ).keys())

out_file = ""

for key in env_keys:
    out_file += key + "=" + os.environ.get(key) + "\n"

with open(".env", "w+") as text_file:
    text_file.write(out_file)