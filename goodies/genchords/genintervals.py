import os
import yaml
import json

here = os.path.dirname(os.path.realpath(__file__)) + '/'

def gen_aug(intervals):
    ret = {}
    for k, v in intervals.items():
        if k[0] == 'M' or k[0] == 'P':
            ret['a' + k[1]] = (v + 1) % 12
    return ret

def gen_dim(intervals):
    ret = {}
    for k, v in intervals.items():
        if k[0] == 'm' or k[0] == 'P':
            ret['d' + k[1]] = (v - 1) % 12
    return ret

def expand(intervals):
    ret = {}
    for k, v in intervals.items():
        if k[0] == 'T':
            continue
        inum = int(k[1])
        ret[k[0] + str(inum + 7)] = v
    return ret


def main():
    with open(here + 'interval_base.yaml', "r") as base_data:
        base = yaml.safe_load(base_data)
    iv = base | gen_aug(base) | gen_dim(base)
    ivals = iv | expand(iv)
    print(json.dumps(ivals, indent=2))

if __name__ == "__main__":
    main()
