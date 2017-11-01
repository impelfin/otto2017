/*
 * Uno_my_delay_ms.c
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

void my_delay_ms(int x){
	while(x--)
	{
		_delay_ms(1);
	}
}

int main(void)
{
	 DDRB=0x0F; //PORTB를 00001111로
	 DDRD=0x00; //PORTD를 00000000로
	 PORTD=0x00;
	 int tim=1000;

	 while (1)
	 {
			if(PIND &(1<<5) && tim==0){
				PORTB=0x0F;
				my_delay_ms(tim);
				PORTB=0x00;
				my_delay_ms(tim);
			} else if (PIND &(1<<5)){
				tim-=100;
				PORTB=0x0F;
				my_delay_ms(tim);
				PORTB=0x00;
				my_delay_ms(tim);
			} else {
				tim=1000;
				PORTB=0x0F;
				my_delay_ms(tim);
				PORTB=0x00;
				my_delay_ms(tim);
			}
	   }
 }
