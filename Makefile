CXX = g++
CXXFLAGS = -std=c++17 -Ilib/uWebSockets/src -Ilib/uWebSockets/uSockets/src -O3
LDFLAGS = -Llib/uWebSockets/uSockets
LDLIBS = -l:uSockets.a -lssl -lcrypto -luv -lz -lpthread

TARGET = server
SRCDIR = src
BUILDDIR = build

SOURCES = $(wildcard $(SRCDIR)/*.cpp)
OBJECTS = $(patsubst $(SRCDIR)/%.cpp, $(BUILDDIR)/%.o, $(SOURCES))

all: $(TARGET)

$(TARGET): $(OBJECTS)
	$(CXX) $(CXXFLAGS) $(LDFLAGS) $^ -o $@ $(LDLIBS)

$(BUILDDIR)/%.o: $(SRCDIR)/%.cpp
	@mkdir -p $(BUILDDIR)
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -rf $(BUILDDIR) $(TARGET)

.PHONY: all clean