from scapy.all import *


def print_pkt(pkt):
    pkt.show()

pkt = sniff(iface='br-b079e8497412', filter='icmp', prn=print_pkt)
    
