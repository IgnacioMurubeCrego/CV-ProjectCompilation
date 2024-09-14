----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 07.12.2023 15:30:41
-- Design Name: 
-- Module Name: canMachine - Behavioral
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

entity canMachine is
Port ( clk, rst : in std_logic;
       coin_in : in std_logic_vector(2 downto 0); 
       empty : in std_logic;
       lata : out std_logic; 
       coin_out : out std_logic_vector(2 downto 0)
      );
end canMachine;

architecture Behavioral of canMachine is

type state is (E0,E1,E2);
signal CS,NS : state; 
signal money_in : std_logic_vector(2 downto 0);
constant precio_lata : unsigned(2 downto 0) := "010";

begin

process(clk)
begin
    if rising_edge(clk) then
        if rst = '0' then
            CS <= NS;
        else
            CS <= E0;
        end if;
    end if;
end process;

process(CS,coin_in)
begin

    case CS is 
    
       when E0 =>
            money_in <= "000";
            lata <= '0';
            coin_out <= "000";
            if coin_in = "001" then
                NS <= E1;
                money_in <= "001";
            elsif coin_in = "010" then
                NS <= E2;
                money_in <= "010";
            elsif coin_in = "101" then
                NS <= E2;
                money_in <= "101";
            else
                NS <= CS;
            end if;
            
        when E1 =>
            lata <= '0';
            if rst = '1' then
                coin_out <= "001";
            else
                coin_out <= "000";
            end if;
            if coin_in = "001" then
                NS <= E2;
                money_in <= "010";
            elsif coin_in = "010" then
                NS <= E2;
                money_in <= "011";
            elsif coin_in = "101" then
                NS <= E2;
                money_in <= "110";
            else
                NS <= CS;
            end if;
                        
         when E2 => 
         
            lata <= '1';
            coin_out <= std_logic_vector(unsigned(money_in) - unsigned(precio_lata));
            NS <= E0;
            
            -- Caso en el que el inventario estubiese vacio : 
            -- if empty = '0' then
            --      lata <= '1';
            -- else
            --      coin_out <= money_in;
            --      NS <= E0;
            
    end case;
end process;

end Behavioral;