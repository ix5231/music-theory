import yaml
import json


def gen_chord(c, scales):
    return {
        find: c["find"]
    }


def main():
    with open('theory.yaml', "r") as theory_file:
        theory = yaml.safe_load(theory_file)

    scales = theory["scales"]
    chords = theory["chords"]
    print(json.dumps({key: gen_chord(value, scales)
          for key, value in chords.items()}))


if __name__ == "__main__":
    main()
