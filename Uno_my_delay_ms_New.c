/*
 * Uno_my_delay_ms_New.c
 *
 * Created: 2017-10-17 오후 9:29:32
 * Author : Moon
 */ 

#define F_CPU 16000000UL

#include <avr/io.h>
#include <util/delay.h>

#define D0 PD0
#define D1 PD1
#define D2 PD2
#define D3 PD3
#define D4 PD4
#define D5 PD5
#define D6 PD6
#define D7 PD7
#define D8 PB0
#define D9 PB1
#define D10 PB2
#define D11 PB3
#define D12 PB4
#define D13 PB5
#define A0 PC0
#define A1 PC1
#define A2 PC2
#define A3 PC3
#define A4 PC4
#define A5 PC5

#define DEBOUCE_MS 1000

int n=DEBOUCE_MS;

void my_delay_ms(n){
	while(n--){
		_delay_ms(1);
	}
}

int main(void)
{
	
	DDRB = 0x0F;	//PORTB를 00001111로 설정 8,9,10,11포트를 출력으로 설정(DDRx)
	DDRD = 0x00;	//PORTB를 00000000로 설정 (입력으로 설정) 
	PORTD =0x00;	//PORTD 초기화

    while (1) 
    {
		PORTB |= (1<<D8)|(1<<D9)|(1<<D10)|(1<<D11);
		_delay_ms(DEBOUCE_MS);
		PORTB &= ~((1<<D8)|(1<<D9)|(1<<D10)|(1<<D11));
		_delay_ms(DEBOUCE_MS);
				
		while ((PIND &(1<<D5))&&(n>100)) //스위치on ms >= 100 인동안
		{
			n-=100;
			PORTB |= (1<<D8)|(1<<D9)|(1<<D10)|(1<<D11);
			my_delay_ms(n);
			PORTB &= ~((1<<D8)|(1<<D9)|(1<<D10)|(1<<D11));
			my_delay_ms(n);	
		}		
    }
}
