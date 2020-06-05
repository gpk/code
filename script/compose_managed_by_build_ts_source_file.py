import json
import os
import sys
from typing import Dict

class TsConstant:
    name: str
    value: Dict
    comment: str

    def __init__(
            self,
            name: str,
            value: Dict,
            comment: str
    ) -> None:
        self.name = name
        self.value = value
        self.comment = comment


ts_constants = []

python_relative_path_to_content = {}

python_source_root = sys.argv[1]
for root, dirs, files in os.walk(python_source_root, topdown=False):
    relative_dir = root.replace(python_source_root + "/", "")
    for name in files:
        if name.endswith(".py") and not name.startswith("test_"):
            relative_path = os.path.join(relative_dir, name)
            path = os.path.join(root, name)
            with open(path) as f:
                python_relative_path_to_content[relative_path] = f.read()

ts_constants.append(
    TsConstant(
        name="PROJECT_PYTHON_FILES",
        value=python_relative_path_to_content,
        comment="Map of path to content of all project python files, excepting test-related files."))


def convert_ts_constant_to_ts_string(ts_constant: TsConstant) -> str:
    result = "// %s\n" % ts_constant.comment
    result += "export const %s: { [key: string]: string } = %s\n" % (
        ts_constant.name, json.dumps(ts_constant.value, indent=4, sort_keys=True))
    return result


print("\n\n".join(map(convert_ts_constant_to_ts_string, ts_constants)))
