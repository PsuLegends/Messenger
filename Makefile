CXX = g++
# Флаги для Qt
QT_CFLAGS = $(shell pkg-config --cflags Qt5Core Qt5Sql)
# Добавляем -fPIC явно
CXXFLAGS = -std=c++20 -fPIC -Ilib/uWebSockets/src -Ilib/uWebSockets/uSockets/src $(QT_CFLAGS) -O3
# Библиотеки Qt
QT_LIBS = $(shell pkg-config --libs Qt5Core Qt5Sql)
LDFLAGS = -Llib/uWebSockets/uSockets
LDLIBS = -l:uSockets.a -lssl -lcrypto -luv -lz -lpthread $(QT_LIBS)

TARGET = server
SRCDIR = src
BUILDDIR = build

# Находим main.cpp отдельно
MAIN_SOURCE = $(SRCDIR)/main.cpp
MAIN_OBJECT = $(BUILDDIR)/main.o

# Рекурсивный поиск остальных .cpp файлов
MODULE_SOURCES := $(shell find $(SRCDIR) -type f -name '*.cpp' ! -path '$(SRCDIR)/main.cpp')
MODULE_OBJECTS := $(patsubst $(SRCDIR)/%.cpp,$(BUILDDIR)/%.o,$(MODULE_SOURCES))

.PHONY: all clean check_libs

all: check_libs $(TARGET)

$(TARGET): $(MAIN_OBJECT) $(MODULE_OBJECTS)
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $^ -o $@ $(LDLIBS)

$(MAIN_OBJECT): $(MAIN_SOURCE)
	@mkdir -p $(BUILDDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(BUILDDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(dir $@)
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(BUILDDIR) $(TARGET)

# Цель для проверки наличия необходимых библиотек
check_libs:
	@echo "Проверка наличия необходимых библиотек..."

	# Проверка libuv
	@if ! pkg-config --exists libuv; then \
		echo "Ошибка: Библиотека libuv не найдена. Она необходима для сборки проекта."; \
		echo "Пожалуйста, установите пакет разработки libuv для вашей системы:"; \
		echo "  Для Debian/Ubuntu: sudo apt update && sudo apt install libuv1-dev"; \
		echo "  Для Fedora/RHEL/CentOS: sudo dnf install libuv-devel"; \
		echo "  Для Arch Linux: sudo pacman -S libuv"; \
		echo "  Для macOS (Homebrew): brew install libuv"; \
		echo "  Для FreeBSD: sudo pkg install libuv"; \
		exit 1; \
	fi
	@echo "libuv найдена."

	# Проверка OpenSSL (для libssl и libcrypto)
	@if ! pkg-config --exists openssl; then \
		echo "Ошибка: Библиотека OpenSSL (libssl, libcrypto) не найдена."; \
		echo "Пожалуйста, установите пакет разработки OpenSSL для вашей системы:"; \
		echo "  Для Debian/Ubuntu: sudo apt update && sudo apt install libssl-dev"; \
		echo "  Для Fedora/RHEL/CentOS: sudo dnf install openssl-devel"; \
		echo "  Для Arch Linux: sudo pacman -S openssl"; \
		echo "  Для macOS (Homebrew): brew install openssl"; \
		echo "  Для FreeBSD: sudo pkg install openssl"; \
		exit 1; \
	fi
	@echo "OpenSSL найдена."

	# Проверка zlib
	@if ! pkg-config --exists zlib; then \
		echo "Ошибка: Библиотека zlib не найдена."; \
		echo "Пожалуйста, установите пакет разработки zlib для вашей системы:"; \
		echo "  Для Debian/Ubuntu: sudo apt update && sudo apt install zlib1g-dev"; \
		echo "  Для Fedora/RHEL/CentOS: sudo dnf install zlib-devel"; \
		echo "  Для Arch Linux: sudo pacman -S zlib"; \
		echo "  Для macOS (Homebrew): brew install zlib"; \
		echo "  Для FreeBSD: sudo pkg install zlib"; \
		exit 1; \
	fi
	@echo "zlib найдена."

	# Проверка Qt5Core
	@if ! pkg-config --exists Qt5Core; then \
		echo "Ошибка: Модуль Qt5Core не найден."; \
		echo "Пожалуйста, установите пакет разработки Qt5Core для вашей системы:"; \
		echo "  Для Debian/Ubuntu: sudo apt update && sudo apt install qtbase5-dev"; \
		echo "  Для Fedora/RHEL/CentOS: sudo dnf install qt5-qtbase-devel"; \
		echo "  Для Arch Linux: sudo pacman -S qt5-base"; \
		echo "  Для macOS (Homebrew): brew install qt@5"; \
		echo "  (Примечание: для macOS Homebrew устанавливает все основные модули Qt5)"; \
		exit 1; \
	fi
	@echo "Qt5Core найдена."

	# Проверка Qt5Sql
	@if ! pkg-config --exists Qt5Sql; then \
		echo "Ошибка: Модуль Qt5Sql не найден."; \
		echo "Пожалуйста, установите пакет разработки Qt5Sql для вашей системы:"; \
		echo "  Для Debian/Ubuntu: sudo apt update && sudo apt install libqt5sql5-dev"; \
		echo "  Для Fedora/RHEL/CentOS: sudo dnf install qt5-qtbase-devel"; \
		echo "  Для Arch Linux: sudo pacman -S qt5-base"; \
		echo "  Для macOS (Homebrew): brew install qt@5"; \
		echo "  (Примечание: для macOS Homebrew устанавливает все основные модули Qt5)"; \
		exit 1; \
	fi
	@echo "Qt5Sql найдена."

	@echo "Все необходимые библиотеки найдены. Продолжаем сборку."
