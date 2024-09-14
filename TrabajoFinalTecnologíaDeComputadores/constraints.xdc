# Map Input Clock
set_property PACKAGE_PIN E3      [get_ports CLK]
set_property IOSTANDARD LVCMOS33 [get_ports CLK]

# Map Output LED
set_property PACKAGE_PIN H17     [get_ports LED]
set_property IOSTANDARD LVCMOS33 [get_ports LED]

create_clock -period 10.000 -name clk -waveform {0.000 5.000} [get_ports clk]
