VERSION 5.00
Begin VB.Form Form1 
   Caption         =   "Köþegen"
   ClientHeight    =   8055
   ClientLeft      =   165
   ClientTop       =   555
   ClientWidth     =   14055
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   ScaleHeight     =   8055
   ScaleWidth      =   14055
   StartUpPosition =   2  'CenterScreen
   Begin VB.ComboBox Combo2 
      Height          =   315
      Left            =   3240
      TabIndex        =   1
      Text            =   "Combo2"
      Top             =   120
      Width           =   1095
   End
   Begin VB.ComboBox Combo1 
      Height          =   315
      Left            =   1080
      TabIndex        =   0
      Text            =   "Combo1"
      Top             =   120
      Width           =   1095
   End
   Begin VB.Label Label4 
      Caption         =   "Birim kareden geçer"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   162
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   255
      Left            =   5880
      TabIndex        =   5
      Top             =   240
      Width           =   2295
   End
   Begin VB.Label Label3 
      Caption         =   "Label3"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   13.5
         Charset         =   162
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   375
      Left            =   5160
      TabIndex        =   4
      Top             =   120
      Width           =   615
   End
   Begin VB.Label Label2 
      Caption         =   "Geniþlik"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   162
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   375
      Left            =   2280
      TabIndex        =   3
      Top             =   120
      Width           =   855
   End
   Begin VB.Label Label1 
      Caption         =   "Yükseklik"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   162
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   375
      Left            =   120
      TabIndex        =   2
      Top             =   120
      Width           =   855
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim genislik, yukseklik As Double
Dim alan_gen, alan_yuk As Double
Dim formYukleme As Boolean


Private Sub Combo1_Click()
    If formYukleme = True Then
        Ciz
    End If
    formYukleme = True
End Sub

Private Sub Combo1_KeyPress(KeyAscii As Integer)
Ciz
End Sub


Private Sub Combo2_Click()
    If formYukleme = True Then
        Ciz
    End If
    formYukleme = True
End Sub

Private Sub Combo2_KeyPress(KeyAscii As Integer)
Ciz
End Sub



Private Sub Combo2_KeyUp(KeyCode As Integer, Shift As Integer)
Ciz
End Sub

Private Sub Combo1_KeyUp(KeyCode As Integer, Shift As Integer)
Ciz
End Sub

Private Sub Form_Load()

    genislik = Screen.Width
    yukseklik = Screen.Height
    'MsgBox Screen.Width & " " & Screen.Height
    
    'Ekran cozurlugune gore ayarla
    If genislik > 13000 And yukseklik > 10000 Then
        alan_gen = genislik * 0.88
        alan_yuk = yukseklik * 0.88
    Else 'Ekran cozunurlugu kucuk ise
        alan_gen = genislik
        alan_yuk = yukseklik
    End If
    
      'ekrana göre ayarla
    Me.Height = alan_yuk
    Me.Width = alan_gen
    
    For i = 1 To 100
        Combo1.AddItem (i)
        Combo2.AddItem (i)
    Next
        Combo1.ListIndex = 0
        Combo2.ListIndex = 0
End Sub

Private Sub Ciz()

formYukleme = True

Dim a, b
Dim c, d As Double
'Dim x_ara, y_ara As Double
Dim birim As Double
Dim baslangic_x, baslangic_y As Double
Dim bitis_x, bitis_y As Double

a = Combo1.Text
b = Combo2.Text

If a = "" Or b = "" Or a <= 0 Or b <= 0 Or (Not IsNumeric(a)) Or (Not IsNumeric(b)) Then
 Exit Sub
End If


c = alan_yuk * 0.9
d = alan_gen * 0.9
'x_ara = alan_gen * 0.1
'y_ara = alan_yuk * 0.1

'Kenarlara göre birimi seçme
If d > c Then
    If a >= b Then
        birim = c / a
        If birim * b > d Then
            birim = d / b
        End If
    Else
        birim = d / b
        If birim * a > c Then
            birim = c / a
        End If
    End If
ElseIf c > d Then
    If a <= b Then
        birim = d / b
        If birim * a > c Then
            birim = c / a
        End If
    Else
        birim = c / a
         If birim * b > d Then
            birim = d / b
        End If
    End If
Else
    If a <= b Then
        birim = d / b
        If birim * a > c Then
            birim = c / a
        End If
    Else
        birim = c / a
         If birim * b > d Then
            birim = d / b
        End If
    End If
End If



Form1.Cls

'bitis_x = baslangic_x + b * birim
'bitis_y = baslangic_y + a * birim

baslangic_x = (alan_gen / 2) - birim * (b / 2)
bitis_x = (alan_gen / 2) + birim * (b / 2)
baslangic_y = (alan_yuk / 2) - birim * (a / 2)
bitis_y = (alan_yuk / 2) + birim * (a / 2)
    
'Dikdörtgeni çiz
'Line (baslangic_x, baslangic_y)-(baslangic_x, bitis_y)
'Line (baslangic_x, baslangic_y)-(bitis_x, baslangic_y)
'Line (baslangic_x, bitis_y)-(bitis_x, bitis_y)
'Line (bitis_x, baslangic_y)-(bitis_x, bitis_y)


'________________________________IZGARA_________________________________________
'Dikey Çizgileri çiz
DrawWidth = 1
For i = 0 To b
 Line (baslangic_x + i * birim, baslangic_y)-(baslangic_x + i * birim, bitis_y)
Next
'Yatay çizgiler çiz
For i = 0 To a
 Line (baslangic_x, baslangic_y + i * birim)-(bitis_x, baslangic_y + i * birim)
Next

'Kenarlarý rengini ve kalýnlýðýný deðiþtir
DrawWidth = 2
Line (baslangic_x, baslangic_y)-(bitis_x, bitis_y), vbBlue, B

'Köþegeni çiz
DrawWidth = 2
Line (baslangic_x, baslangic_y)-(bitis_x, bitis_y), vbRed
'_______________________________________________________________________________

'_______________________KÖÞEGENLERÝ BOYA________________________________________

'DrawWidth = 1
'If a > b Then
 '    For i = 0 To b
'     Next
'ElseIf a < b Then
'     For i = 0 To b
'     Next
'Else
 '    For i = 0 To b
 '    Next
'End If


'________________________________________________________________________________
'Form1.Caption = "Birim=" & birim & "   Baþlangýç=" & Round(baslangic_x, 4) & "----" & Round(baslangic_y, 4) _
'& "    Bitiþ=" & Round(bitis_x, 4) & "----" & Round(bitis_y, 4) & "    Alan=" & alan_gen & " X " & _
'alan_yuk & " br2    d/c=" & Round((alan_gen / alan_yuk), 4) & "     c/d=" & Round((alan_yuk / alan_gen), 4) & _
'"     a/b=" & Round((a / b), 4) & "    b/a=" & Round((b / a), 4)
'__________________________________________________________________________________
Label3.Caption = Str(CInt(Combo1.Text) + CInt(Combo2.Text) - OBEB(CInt(Combo1.Text), CInt(Combo2.Text)))

End Sub


Private Sub Form_Paint()
Ciz
End Sub

Private Sub Form_Resize()
    If formYukleme = True Then
        alan_yuk = Me.Height
        alan_gen = Me.Width
        Ciz
    End If
End Sub


Public Function OBEB(x As Integer, y As Integer) As Integer

Dim bolen, gerceklesti
gerceklesti = 0

If x < y Then
  bolen = x
Else
  bolen = y
End If

While bolen > 1 And gerceklesti = 0

    If x Mod bolen = 0 And y Mod bolen = 0 Then
      OBEB = bolen
      gerceklesti = 1
    Else
      bolen = bolen - 1
    End If

    If bolen = 1 Then
      OBEB = 1
      gerceklesti = 1
    End If

Wend

OBEB = bolen
End Function
