import requests # http request

from bs4 import BeautifulSoup #web scraping
#send the mail
import smtplib
#email body
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
#system date and time manipulation
import datetime

now = datetime.datetime.now()

#email contnt placeholder

content =  ""

#extracting Hacker News Stories

def extract_news(url):
  print("Extracting Hacker News Strories...")
  cnt = ""
  cnt += ("<b>HN Top Stories:</b>\n"+"<br>"+"-"*50+"<br>")
  response = requests.get(url)
  content = response.content
  soup = BeautifulSoup(content, "html.parser")
  for i, tag in enumerate(soup.find_all("td",attrs={"class":"title","valign":""})):
    cnt += ((str(i+1)+" :: "+tag.text + "\n" + "<br>") if tag.text != "more" else "")
    #print(tag.prettify) #find_all("span",attrs={"class":"sitestr"})
  return(cnt)

cnt = extract_news()
content += cnt
content += ("<br>----------------------------<br>")
content += ("<br><br>End Of Message")

#lets send the email 
print("Composing email...")

#updating your email details 

SERVER = "smtp.gmail.com" # your smtp server
PORT = 587 # your port number 
FROM = " from your email id "
TO = "to your email ids" # could be a list
PASS = "your email id's password"

# fp = open(file_name, 'rb')
# creat a text/plain message
# msg = MIMEText('')
msg = MIMEMultipart()

# msg.add_header('Content-Disposition', 'attachment', filename = 'empty.txt')
msg['subject'] = 'Top News Stories HN [Automated Email]'+ '-' +str(now.day)+ '-' + str(now.month) + '-'+ str(now.year)
msg['From'] = FROM
msg['To'] = TO 

msg.attach(MIMEText(content,'html'))
#fp.close ()

print('initiating server...')

server = smtplib.SMTP(SERVER, PORT)
#server = smtplib.SMTP SSL('smtp.gmail.com', 465)
server.set_debuglevel(1)
server.ehlo()
server.starttls()
#server.ehlo
server.login(FROM, PASS)
server.sendmail(FROM, TO, msg.as_string())

print('Email Sent...')

Server.quit()
