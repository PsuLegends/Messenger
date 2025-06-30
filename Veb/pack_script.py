import os

def pack_project_to_markdown(source_dir, output_file, exclude_dirs=None, exclude_files=None):
    """
    Считывает все файлы из указанной директории и её подпапок,
    и упаковывает их содержимое в один Markdown-файл с сохранением структуры
    и блоками кода для подсветки синтаксиса.

    :param source_dir: Путь к исходной директории проекта.
    :param output_file: Имя Markdown-файла, в который будет записан результат.
    :param exclude_dirs: Список названий папок, которые нужно проигнорировать.
    :param exclude_files: Список названий файлов, которые нужно проигнорировать.
    """
    # === СЛОВАРЬ ДЛЯ ПОДСВЕТКИ СИНТАКСИСА ===
    # Сопоставляет расширения файлов с языками, которые понимает Markdown
    lang_map = {
        '.py': 'python',
        '.js': 'javascript',
        '.html': 'html',
        '.css': 'css',
        '.md': 'markdown',
        '.json': 'json',
        '.sh': 'shell',
        '.yml': 'yaml',
        '.yaml': 'yaml',
        '.xml': 'xml',
        '.ts': 'typescript',
        '.java': 'java',
        '.c': 'c',
        '.cpp': 'cpp',
        '.cs': 'csharp',
        '.go': 'go',
        '.php': 'php',
        '.rb': 'ruby',
        '.rs': 'rust',
        '.kt': 'kotlin',
        '.swift': 'swift',
        '.txt': '' # Для .txt просто текстовый блок без подсветки
    }

    if exclude_dirs is None:
        exclude_dirs = ['.git', '__pycache__', '.vscode', 'venv', 'node_modules', '.idea']
    if exclude_files is None:
        exclude_files = []

    # Не включаем в упаковку сам выходной файл и сам скрипт
    exclude_files.append(os.path.basename(output_file))
    exclude_files.append(os.path.basename(__file__))

    print(f"Начинаю упаковку директории '{os.path.abspath(source_dir)}' в файл '{output_file}'...")

    try:
        with open(output_file, 'w', encoding='utf-8') as f_out:
            # === ИЗМЕНЕНИЕ 1: Заголовок в формате Markdown ===
            f_out.write(f"# Проект из папки: {os.path.abspath(source_dir)}\n\n")

            for dirpath, dirnames, filenames in os.walk(source_dir):
                dirnames[:] = [d for d in dirnames if d not in exclude_dirs]
                
                for filename in sorted(filenames):
                    if filename in exclude_files:
                        continue

                    file_path = os.path.join(dirpath, filename)
                    relative_path = os.path.relpath(file_path, source_dir)
                    
                    # === ИЗМЕНЕНИЕ 2: Заголовок файла и блок кода ===
                    f_out.write(f"## Файл: `{relative_path.replace('\\', '/')}`\n\n")

                    try:
                        with open(file_path, 'r', encoding='utf-8') as f_in:
                            content = f_in.read()
                            
                            # Определяем язык для подсветки
                            _, ext = os.path.splitext(filename)
                            language = lang_map.get(ext.lower(), '') # .get() безопасен, если расширения нет в словаре

                            # Оборачиваем содержимое в блок кода Markdown
                            f_out.write(f"```{language}\n")
                            f_out.write(content)
                            f_out.write("\n```\n\n")
                    except Exception as e:
                        f_out.write(f"```\n*** Не удалось прочитать файл (возможно, бинарный): {e} ***\n```\n\n")

        print(f"Готово! Проект успешно упакован в '{output_file}'.")

    except Exception as e:
        print(f"Произошла ошибка: {e}")


# --- Пример использования ---
if __name__ == "__main__":
    project_directory = "."
    
    # === ИЗМЕНЕНИЕ 3: Имя выходного файла теперь .md ===
    packed_file = "packed_project.md"
    
    # Запускаем обновленную функцию
    pack_project_to_markdown(project_directory, packed_file)