library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity full_add_sub_Nbits_tb is
end full_add_sub_Nbits_tb;

architecture Behavioral of full_add_sub_Nbits_tb is

constant N_VALUE: integer := 3;
    
signal clk: std_logic := '0';
signal A, B: std_logic_vector(N_VALUE - 1 downto 0);
signal add_sub: std_logic := '0';
signal S: std_logic_vector(N_VALUE-1 downto 0);
    
component full_add_sub_Nbits is
Generic( N : integer := 3
        );
Port ( clk : in std_logic;
       A,B : in std_logic_vector(N-1 downto 0);
       add_sub : in std_logic;
       S : out std_logic_vector(N downto 0)
     );
end component;

begin

-- Clock process
process
begin
    clk <= '0';
    wait for 5 ns;
    clk <= not clk;
    wait for 5 ns;
end process;

UUT: full_add_sub_Nbits 
    port map (
        clk => clk,
        A => A,
        B => B,
        add_sub => add_sub,
        S => S
    );

process
begin
    add_sub <= '0';
    wait for 11 ns;
    add_sub <= not clk;
    wait for 10 ns;
end process;

process
begin
A <= (others => '0'); 
B <= (others => '0'); 
wait for 30 ns;
A <= (others => '1'); 
B <= (others => '1'); 
wait for 20 ns;
A <= "010";
B <= "010";
wait for 20 ns;
A <= "011";
B <= "010";
wait for 20 ns;
A <= "110";
B <= "010";
wait for 20 ns;
A <= "101";
B <= "010";
wait;
end process;

end Behavioral;
