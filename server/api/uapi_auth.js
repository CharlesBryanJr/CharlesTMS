import crypto from 'crypto';

export const generateRequestId = () => {
  const timestamp = new Date().getTime();
  const randomId = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomId}`;
};

export const generateAuthorizationHeader = (accessId, 
                                            privateKey, 
                                            method, 
                                            body, 
                                            contentType, 
                                            date, 
                                            requestId, 
                                            path) => {
  // Step 1: Build the canonical string
  const canonicalString = `${method}\n${crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex')}\n${contentType}\n${date}\n${requestId || ''}\n${path}`;

  // Step 2: Generate the RSA signature
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(canonicalString);
  const signature = signer.sign(privateKey, 'base64');

  // Step 3: Encode the signature as base64
  const encodedSignature = Buffer.from(signature).toString('base64');

  // Step 4: Build the Authorization header
  const authorizationHeader = `TPAY-AUTH-V2 ${accessId}:${encodedSignature}`;
  console.log(authorizationHeader)
  return authorizationHeader;
};


export const generateRequestHeaders = (body, path) => {

  const accessId = '8a4c58f8-9390-46e8-a549-4d0fa9de40b6';
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgFNZMLs/ifBQ1RzYW1r8OYFBgTTmynIsPbZVZXaDmXkMrt3b5D0
noLxqT3yVWhW4QaehlKgp8/3ImT7bSVoANG2q1+Jd4ptQubnlvR8Z/YIbDYnB5HZ
IR7Ayr9xHD57w1EEV2X5iZL7+06Im86AOr7VrL4NBM+KGqwgndmE+5mtdAgMBAAE
CgYBDaBx7MzXRfu37uBaaDOZM3LcsG4Kat6DpN0Mph+C0/0bk8pMxyjy6ZJgIP5l
te2jNs2XQYq2LD5KwPRSjjwrWwQjVsbW0F1nB4vNgoZ9duZ2wTRWOcQvzfGOqwMR
C9jwXvQMHajJhSbK6pQ0q5zP4aX/hW9SosVXL583u82GIWQJBAKIaSuf8wQj2JeO
uUfuOMXhTGg17BcOl9q87HSkpcBstqhPLxKVZWzg1YBAKSsmUF2jjzqnhUU6fuJ3
5SPRdmF8CQQCDoKqB6H2lNzZSYmao8yN/1FhLd1ey1+U7qrsYnDewvpDvqrpIfN5
QD48NSAVP7rqf3lIqqC5yAHxIv36BzoXDAkAhuRqQPJLkDGFBhohjruc3wwIOf+N
pGmPBfKjKYWaDIPLa/28/fuFtRh1f+OQqH3bnSU07JjbGBpBfvPaib749AkA5Fo3
dGgCkj3W39YWg8RMMdgR1dqVKo+iAIGRVICvnND+YMuvoVH/3KUhZ8kqbiGbYv4v
ThG3gc+Vzh9pOYkwRAkEAnbZ8rqahagXwNr366u/7Xb9jr5mfAtybeFaU+XPlsgi
piIL8848e5XTMy7kSGvMbWVoL+BTsxWC8SdVqfPm/YA==
-----END RSA PRIVATE KEY-----`;
  const method = 'POST'; // Corrected to uppercase "POST"
  const contentType = 'application/json';
  const date = new Date().toISOString();
  const requestId = generateRequestId();

  const headers = {
    'Request-ID': generateRequestId(),
    'Authorization': generateAuthorizationHeader(accessId, 
                                                 privateKey, 
                                                 method, 
                                                 body, 
                                                 contentType, 
                                                 date, 
                                                 requestId, 
                                                 path),
    'Date': new Date().toISOString(),
    'Content-Type': 'application/json',
    'User-Agent': 'MyApplication/1.0',
    'Accept': '*/*',
    'Host': 'sandbox.unified-api.triumphpay.com',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
  };

  return headers;
};