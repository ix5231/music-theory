import yaml
import json


with open('intervals.json', "r") as theory_file:
    intervals = json.load(theory_file)


def intervals_to_bits(i):
    ivals = map(lambda i: intervals[i], i)
    res = 0
    for v in ivals:
        res |= 1 << v
    return res


def gen_chords_scale(chord, scales):
    target_scale = scales[chord["from"]]
    res = {}
    for i, v in enumerate(chord["chordIds"]):
        if chord["chordIds"][i] == None:
            continue
        c = []
        for j in range(i + 1):
            c.append(target_scale[j * 2 % len(target_scale)])
        bit = intervals_to_bits(c)
        new_chord = {
            "id": v,
            "intervals": c
        }
        if res.get(bit) != None:
            res[bit].append(new_chord)
        else:
            res[bit] = [new_chord]

    return res


def gen_chords_enum(chords):
    res = {}
    for c in chords:
        new_chord = {
            "id": c["id"],
            "intervals": c["from"]
        }
        bit = intervals_to_bits(c["from"])
        if res.get(bit) != None:
            res[bit].append(new_chord)
        else:
            res[bit] = [new_chord]
    return res


def run_strategies(c, scales):
    generate_strategies = c["chords"]
    for gs in generate_strategies:
        if gs["strategy"] == "scale":
            res = gen_chords_scale(gs, scales)
        elif gs["strategy"] == "enum":
            res = gen_chords_enum(gs["chords"])

    return {
        "find": c.get("find") or "last",
        "chords": res
    }


def main():
    with open('theory.yaml', "r") as theory_file:
        theory = yaml.safe_load(theory_file)

    scales = theory["scales"]
    chords = theory["chords"]
    res = {key: run_strategies(value, scales)
           for key, value in chords.items()}
    print(json.dumps(res, indent=2))


if __name__ == "__main__":
    main()
