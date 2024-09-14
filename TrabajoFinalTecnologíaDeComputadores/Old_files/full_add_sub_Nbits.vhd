----------------------------------------------------------------------------------
-- Company: 
-- Engineer: 
-- 
-- Create Date: 21.11.2023 10:40:35
-- Design Name: 
-- Module Name: full_add_sub_Nbits - Behavioral
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

-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--use IEEE.NUMERIC_STD.ALL;

-- Uncomment the following library declaration if instantiating
-- any Xilinx leaf cells in this code.
--library UNISIM;
--use UNISIM.VComponents.all;

entity full_add_sub_Nbits is
Generic( N : integer := 4
        );
Port ( clk : in std_logic;
       A,B : in std_logic_vector(N-1 downto 0);
       add_sub : in std_logic;
       S : out std_logic_vector(N downto 0)
    );
end full_add_sub_Nbits;

architecture Behavioral of full_add_sub_Nbits is

component full_adder1 is 
Port ( A, B, Cin : in std_logic;
       S, Cout : out std_logic
       );
end component;

signal A_r,B_r : std_logic_vector(N-1 downto 0);
signal add_sub_r, Cin_s : std_logic;
signal A_s, B_s, S_s, Cout_s: std_logic_vector(N downto 0);

begin

process(clk)
begin
    if rising_edge(clk) then
        A_r <= A;
        B_r <= B;
        add_sub_r <= add_sub;
        S <= S_s;
     end if;
end process;


Cin_s <= add_sub_r;
-- Concatenamos MSB para extender el signo
A_s <= A_r(N-1) & A_r; 
-- En suma extendemos el signo, en resta estendemos e invertimos los bits
B_s <= B_r(N-1) & B_r when add_sub_r = '0' else not(B_r(N-1) & B_r);
    
-- 1er sumador/restador de 1 bit : 
B0: full_adder1 port map(A => A_s(0), B => B_s(0), Cin => Cin_s, S => S_s(0), Cout => Cout_s(0));
-- Generamos el resto de sumadores/restadores ( for generate ) :
FG_ADD : for ii in 1 to N generate 
begin
    B_ii : full_adder1 port map(A => A_s(ii), B => B_s(ii), Cin => Cout_s(ii-1), S => S_s(ii), Cout => Cout_s(ii));
end generate;

end Behavioral;
