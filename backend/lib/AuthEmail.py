# NIE DZIAŁA

# import smtplib
# from email.mime.text import MIMEText
#
# # Konfiguracja serwera SMTP
# SMTP_SERVER = 'smtp.gmail.com'
# SMTP_PORT = 587
# EMAIL_ADDRESS = 'prachatauth@gmail.com'
# EMAIL_PASSWORD = '030125#ffc951'
#
#
# def send_email(to_adress, code):
#     msg = MIMEText(f'Your verificion code is: {code}')
#     msg['Subject'] = 'praChat - Authorization'
#     msg['From'] = EMAIL_ADDRESS
#     msg['To'] = to_adress
#
#     with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
#         server.starttls()
#         server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
#         server.sendmail(EMAIL_ADDRESS, to_adress, msg.as_string())
#
#
# def verify_code(input_code, actual_code):
#     return input_code == actual_code
#
#
# if __name__ == '__main__':
#     code = 444
#     email = 'liveisbrutal777@gmail.com'
#     send_email(email, code)

# import imaplib
# import email
#
# IMAP_SERVER = 'imap.world4you.com'
# IMAP_ADDRESS = 'prachatauth@gmail.com'
# IMAP_PASSWORD = '030125#ffc951'
#
# imap = imaplib.IMAP4_SSL(IMAP_SERVER)
# imap.login(IMAP_ADDRESS, IMAP_PASSWORD)

