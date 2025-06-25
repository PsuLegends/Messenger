CXX = g++
# Флаги для Qt
QT_CFLAGS = $(shell pkg-config --cflags Qt5Core Qt5Sql)
# Добавляем -fPIC явно
CXXFLAGS = -std=c++17 -fPIC -Ilib/uWebSockets/src -Ilib/uWebSockets/uSockets/src $(QT_CFLAGS) -O3
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

all: $(TARGET)

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

.PHONY: all clean