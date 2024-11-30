import os

def change_directory(path):
    try:
        os.chdir(path)
        print(f"Répertoire changé pour : {os.getcwd()}")
    except FileNotFoundError:
        print(f"Erreur : Le répertoire '{path}' n'existe pas.")
    except PermissionError:
        print(f"Erreur : Vous n'avez pas la permission de changer vers '{path}'.")

# Exemple d'utilisation
if __name__ == "__main__":
    new_path = input("Entrez le chemin du répertoire : ")
    change_directory(new_path)
