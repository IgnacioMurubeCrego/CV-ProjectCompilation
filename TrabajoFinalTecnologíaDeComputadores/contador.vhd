----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 20.12.2023 19:14:04
-- Design Name: 
-- Module Name: contador - Behavioral
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

entity contador is
  Port (clk, rst : in std_logic;
       lata : in std_logic; 
       empty : out std_logic
        );
end contador;

architecture Behavioral of contador is

signal empty_s : std_logic := '0';
signal latas_restantes : integer := 3;

begin

empty <= empty_s;

process(clk)
begin
    if rising_edge(clk) then
        if rst = '1' then
            empty_s <= '0';
            latas_restantes <= 3;
        elsif lata = '1' and empty_s = '0' then
            if latas_restantes > 1 then
                latas_restantes <= latas_restantes - 1 ;
            else
                empty_s <= '1';
            end if;
        end if;
    end if;
end process;

end Behavioral;
