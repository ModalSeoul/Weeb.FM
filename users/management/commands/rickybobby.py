from django.core.management.base import BaseCommand, CommandError
from users.models import Member


class Command(BaseCommand):
    help = 'Creates a new user with appropriate custom fields'

    # mfw I'm too lazy to install 3.5.1 at home
    def handle(self, *args, **options):
        nick = input('Nickname: ')
        email = input('Email: ')
        username = input('Username: ')
        password = input('Password: ')

        # TODO: Hash/salt password (+ bcrypt)
        Member.objects.create(nick_name=nick, email=email,
                              username=username, password=password,
                              is_superuser=True, is_staff=True)
        print('''
                                         aaaaaaa,
                                aaa###############&a,
                             ,d########################aaa,
                          ,d###############################W
                        a####################################L
                      a########################################a
                    ,d##########################################L
                   J########################################WP###L
                  J##########################################L 0##L
                 0########################################MPP0L 0##L
                0###########################@M#@M##MPPPP       ` 0##
               w##########################M#& \&               ,  0#L
              0######################@'### ##& J,               0L PP
             0####M#################P  ###,A##,A#,     aaa,      0Pa7L
            J#####  ,#############P   J###1 ###################Laa####
           JW####        `PPPPPP'    &#####w##########################L
           #####K#                  ##################################L
          0#####0         adaaaaaa##########M' A#######################
         J####### J#    ,##################1    #######################
         0##########   ,###################'    A######################
        J###########Waa####################     J######################F
        0##################################      0#####################F
       J###################################      0#####################F
       J##################################1  J&  0#####################&
       0##################################1 J##  J######################
       0##################################1J##1  J######################
       0##################################  A@    ######################
       0#############################P###@   '    0#####0###############F
       0#######################@####@ ###1        0##### ###############F
      J######################## ####' J##1        0##0## ###############F
      J#######################L ##J@   ##1        0## #  ####0##########&
      J####################### J#FJ'   M#1        0#K #  0## `###########
      J##################0###L J# `    `#1        0#  0  0##  ###########
      J#################L7###L JF  ,J   M1        0#  0  0#K  ###########
      J#################L`#`#L #  a##aa `1        0#  &0#0#,  7##########
      J#################L # 7  \#@PM,,            0#JM  9##&#  ##########
      J################## `   d#'aaa`M            AWK #Mw #0## ##########
       0#################   ,#P J' #&J             0 K 0# 9#K 7#######0##
       0#####M  9########   #P  F J##`,            I Kw##  I  7#######L##
       A####K    0#####L   7#  JaJ### F            I ####  I  7#######LM@
       J####  ,   #####    7P   ##### F            I ####  #  7#######L`F
        0###  9w J#####     L   ##### F            I ####  I  d####`##L F
        A###    V #####     7   @M##F F            I MP0#  I  #####L`#L
         ###    Iw#####     `L  F `#F F            I #  0  I  ###7#L 0L
         J##     0#####      L  \  J'J'               #wW  I  ##P 0L  L
          0#     0#####      `  `PP' /              #aaa&awK 7##L `
           ^ ,   0#####      dPPPPPPP'                    '  7##L
    a      ## P,a0#####                                      7##L
    1PP\aJM Mw   0#####                        Aw            7##L
     Pa,   # 9W  0#####                         #1           7##L
       A,     J#PM#####L                        #            d##L
        1 #   #I  #####L                        '           J###L
       J J   0    0#####                     aa             0###
       P 7  J ,   0####7                   #####&           0###
       \J&, ' I   0####d                  #######          #0###
          9M  I   9####`L                0######1         # 9###
              '   w#0## `L              J#######1       ,#   0#P
              9WwM I,0#7  L             J#######       ,'    ``
      aaaPP0##wM^'0#PP# L  \            J######'      JK
    aP  P#     9w   '#L `L  0            P###@'      JK
  J'      a     9w w 0/  7   `a                     JK    ,
 7         ^     ' I `L   L   `\,                 a#MWaaaPMMPPPP0L
J'                    7    L    #a               /' '#     w     `a
                    , `L   d aP&J`Pa           aP    9     I      `L
                    0  PL  Ld  `#   Ma       aP'  #PMW#    '       `
                     L 77 7L    #    `Ma   PP    J   9
                     L 7 0L7    #,     `PPP#     1   J
                     7 `L  7    `F         J     '   I
                      L L  7     J         J    J    '
                      0 L  7     J          ,   1
                       LL  7     F          1  7    I
                       7   `L    F          1  1    I
                       `L   L    F          J,7M
                        L   7    F           0' &
                        7   7    F           J   1
                         L  7    F           J   P,
                         0  L    F&          J@# 1AW,
                          L,     F`\       J' 1 \& I#
                          07     M  '     J'  1  A, 0
                          `#     `F           1  J   ^
                           P      \           1  1
                                  `F          1 J
                                   M          1J
                                   `          P

        ''')
        print('ACCOUNT....\n CREATED \n IF YOU AINT FIRST YOU\'RE LAST')
