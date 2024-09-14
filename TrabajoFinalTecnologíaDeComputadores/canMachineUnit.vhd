----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 20.12.2023 19:24:49
-- Design Name: 
-- Module Name: canMachineUnit - Behavioral
-- Project Name: 
-- Target Devices: 
-- Tool Versions: 
-- Description: 
-- 
-- Dependencies: 
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
-- 
----------------------------------------------------------------------------------


library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity canMachineUnit is
Port ( clk, rst : in std_logic;
       coin_in : in std_logic_vector(2 downto 0); 
       empty : out std_logic;
       lata : out std_logic; 
       coin_out : out std_logic_vector(2 downto 0)
      );
end canMachineUnit;

architecture Behavioral of canMachineUnit is

component canMachine is
Port ( clk, rst : in std_logic;
       coin_in : in std_logic_vector(2 downto 0); 
       empty : in std_logic;
       lata : out std_logic; 
       coin_out : out std_logic_vector(2 downto 0)
      );
end component;

component contador is
  Port (clk, rst : in std_logic;
       lata : in std_logic; 
       empty : out std_logic
        );
end component;

signal empty_s : std_logic;
signal lata_s : std_logic;

begin

empty <= empty_s;
lata <= lata_s;

-- Caso en el que el inventario estubiese vacio : 
-- lata <= lata_s when empty_s = '0' else '0';

CAN_MACHINE_LOGIC : canMachine
port map ( clk => clk,
           rst => rst,
           coin_in => coin_in,
           empty => empty_s,
           lata => lata_s,
           coin_out => coin_out    
         );

COUNT_MODULE : contador 
port map(clk => clk,
         rst => rst,
         lata => lata_s,
         empty => empty_s
         );

end Behavioral;
