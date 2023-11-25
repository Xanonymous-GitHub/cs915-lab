from scapy.all import *


def print_pkt(pkt):
    pkt.show()

pkt = sniff(iface='br-833fc45cc35a', filter='icmp', prn=print_pkt)
    
