import {
    Html,
    Head,
    // Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from '@react-email/components'

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
      <Html lang="en" title="Verification Email">
        <Head title="Verification Email">
            <title>Verification Code</title>
          {/* <Font 
            href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" 
            family="Roboto" 
            weight={600} 
            style="normal"
          /> */}
        </Head>
        <Preview>
            Here&apos;s your verification code
        </Preview>
        <Section>
            <Row>
                <Heading as="h2">Hello {username}</Heading>
            </Row>
            <Row>
                <Text>
                Thank you for registering. Please use the following verification
                code to complete your registration:
                </Text>
            </Row>
            <Row>
                <Text>{otp}</Text>
            </Row>
            <Row>
                <Text>If you did not request this code, please ignore this email.</Text>
            </Row>
            <Row>
                <Button
                    href="https://example.com/verify"
                    style={{ backgroundColor: '#007bff', color: '#61dafb' }}>
                    Verify Email
                </Button>
            </Row>
        </Section>
      </Html>
  );
}