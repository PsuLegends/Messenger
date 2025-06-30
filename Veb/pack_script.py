import os

def pack_project_to_file(source_dir, output_file, exclude_dirs=None, exclude_files=None):
    """
    Считывает все файлы из указанной директории и её подпапок,
    и упаковывает их содержимое в один текстовый файл с сохранением структуры.

    :param source_dir: Путь к исходной директории проекта.
    :param output_file: Имя файла, в который будет записан результат.
    :param exclude_dirs: Список названий папок, которые нужно проигнорировать.
    :param exclude_files: Список названий файлов, которые нужно проигнорировать.
    """
    if exclude_dirs is None:
        # Стандартные папки, которые часто не нужны в итоговом файле
        # Добавим node_modules, т.к. это часто встречается в веб-проектах
        exclude_dirs = ['.git', '__pycache__', '.vscode', 'venv', 'node_modules']
    if exclude_files is None:
        exclude_files = []

    # Не включаем в упаковку сам выходной файл и сам скрипт
    exclude_files.append(os.path.basename(output_file))
    exclude_files.append(os.path.basename(__file__)) # __file__ это имя текущего файла (pack_script.py)

    print(f"Начинаю упаковку директории '{os.path.abspath(source_dir)}' в файл '{output_file}'...")

    try:
        with open(output_file, 'w', encoding='utf-8') as f_out:
            f_out.write(f"### СТРУКТУРА ПРОЕКТА ИЗ ПАПКИ: {os.path.abspath(source_dir)} ###\n\n")

            for dirpath, dirnames, filenames in os.walk(source_dir):
                # Исключаем ненужные директории
                dirnames[:] = [d for d in dirnames if d not in exclude_dirs]
                
                # Идем по всем файлам в текущей директории
                for filename in sorted(filenames): # Сортируем для более предсказуемого порядка
                    if filename in exclude_files:
                        continue

                    file_path = os.path.join(dirpath, filename)
                    # Получаем относительный путь для красивого отображения
                    relative_path = os.path.relpath(file_path, source_dir)
                    
                    # Пропускаем файлы в корневой директории, если source_dir это '.'
                    # Это нужно чтобы не упаковывать файлы вроде index.html дважды, если они в корне
                    if source_dir == '.' and os.path.dirname(relative_path) == '':
                         # Если нужно упаковать и файлы в корне, убери эту проверку.
                         # В твоем случае index.html, main.js и style.css находятся в корне.
                         pass # Оставляем код как есть, чтобы упаковать все.

                    f_out.write("=" * 80 + "\n")
                    f_out.write(f"Файл: {relative_path.replace('\\', '/')}\n")
                    f_out.write("=" * 80 + "\n\n")

                    try:
                        with open(file_path, 'r', encoding='utf-8') as f_in:
                            content = f_in.read()
                            f_out.write(content)
                        f_out.write("\n\n")
                    except Exception as e:
                        # Некоторые файлы могут быть не текстовыми (картинки, шрифты), их читать не нужно
                        f_out.write(f"*** Не удалось прочитать файл (возможно, бинарный): {e} ***\n\n")

        print(f"Готово! Проект успешно упакован в '{output_file}'.")

    except Exception as e:
        print(f"Произошла ошибка: {e}")

# --- Пример использования ---
if __name__ == "__main__":
    # Указываем, что нужно упаковать ТЕКУЩУЮ директорию.
    # Точка "." в путях означает "текущая директория".
    project_directory = "."  # <--- ВОТ ГЛАВНОЕ ИЗМЕНЕНИЕ

    # Укажите, как будет называться итоговый файл
    packed_file = "packed_project.txt"
    
    # Запускаем функцию
    pack_project_to_file(project_directory, packed_file)