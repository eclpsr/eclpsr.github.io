<?php
$to = "yourmail@gmail.com"; // ����� ���������� ������ �� ����� 
$tema = "����� �������� ����� �� PHP"; // ���� ����������� ������ 
$message = "���� ���: ".$_POST['name']."<br>";//��������� ���������� ��������, ���������� �� ����� name=name
  $message .= "E-mail: ".$_POST['email']."<br>"; //���������� �� ����� name=email
$message .= "����� ��������: ".$_POST['phone']."<br>"; //���������� �� ����� name=phone
$message .= "���������: ".$_POST['message']."<br>"; //���������� �� ����� name=message
$headers  = 'MIME-Version: 1.0' . "\r\n"; // ��������� ������������� ������� ���� ������ �������� ������
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // ��������� �� ��� ����������� ��������
mail($to, $tema, $message, $headers); //���������� ���������� �� ����� �������� ����������
?>