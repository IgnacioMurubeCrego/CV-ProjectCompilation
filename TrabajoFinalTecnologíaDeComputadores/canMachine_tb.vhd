----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 07.12.2023 16:37:55
-- Design Name: 
-- Module Name: canMachine_tb - Behavioral
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

entity canMachineUnit_tb is
end canMachineUnit_tb;

architecture Behavioral of canMachineUnit_tb is

component canMachineUnit is
Port ( clk, rst : in std_logic;
       coin_in : in std_logic_vector(2 downto 0); 
       empty : out std_logic;
       lata : out std_logic; 
       coin_out : out std_logic_vector(2 downto 0)
      );
end component;

signal clk, rst : std_logic := '0';
signal coin_in : std_logic_vector(2 downto 0); 
signal empty : std_logic;
signal lata : std_logic; 
signal coin_out : std_logic_vector(2 downto 0);
signal clk_period : time := 10 ns;

begin

UUT : canMachineUnit
port map(
        clk => clk,
        rst => rst,
        coin_in => coin_in,
        empty => empty,
        lata => lata,
        coin_out => coin_out
        );

-- Ciclos de reloj
process
begin 
    clk <= '0';
    wait for clk_period/2;
    clk <= '1';
    wait for clk_period/2;
end process;

-- Casos de Estimulo : 
process
begin
-- Caso 1       
                Coin_in <= "001";
                wait for clk_period;
                Coin_in <= "000";
                wait for clk_period;
                Coin_in <= "001";
                wait for clk_period;
                
                assert (lata = '1' and coin_out = "000")
                    report "Error Test 1" severity error;
                    
                Coin_in <= "000";
                wait for clk_period;

-- Caso Rst 1
                Coin_in <= "001";
                wait for clk_period;
                rst <= '1';
                Coin_in <= "000";
                wait for 2 ns;                
                assert (lata = '0' and coin_out = "001")
                    report "Error Test 1 RST" severity error;
                wait for clk_period;
                rst <= '0';
                wait for clk_period;

      ---------- Caso 2
                Coin_in <= "001";
                wait for clk_period;
                Coin_in <= "000";
                wait for clk_period;
                Coin_in <= "010";
                wait for clk_period;
                
                assert (lata = '1' and coin_out = "001")
                    report "Error Test 2" severity error;
                    
                Coin_in <= "000";
                wait for clk_period;

    ---------- Caso 3
                Coin_in <= "001";
                wait for clk_period;
                Coin_in <= "000";
                wait for clk_period;
                Coin_in <= "101";
                wait for clk_period;

                assert (lata = '1' and coin_out = "100")
                    report "Error Test 3" severity error;
                    
                Coin_in <= "000";
                wait for clk_period;

    ---------- Caso 4
                Coin_in <= "010";
                wait for clk_period;
                              
                assert (lata = '1' and coin_out = "000")
                    report "Error Test 4" severity error;
                    
                Coin_in <= "000";
                wait for clk_period;


    ---------- Caso 5
                Coin_in <= "101";
                wait for clk_period;
                
                assert (lata = '1' and coin_out = "011")
                    report "Error Test 5" severity error;
                    
                Coin_in <= "000";
                wait for clk_period;

end process;


end Behavioral;