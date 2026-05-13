// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Mustaqbalka halkan ayaan ka hubin doonaa haddii qofku hore u soo galay (Auth check)
  // Hadda, si toos ah ayaan ugu diraynaa Login-ka si aan u tijaabino navigation-ka
  return <Redirect href="/auth/login" />;
}
