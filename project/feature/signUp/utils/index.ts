// Feature: 既存のメールアドレスリストを返す
// Execution Timing: useEffect内でSignUpFormコンポーネントが最初にレンダリングされる際に1度だけ実行
// Returns: alreadyEmails : string[]
export const getAlreadyEmails = async () => {
  const response: Response = await fetch("/api/signUp");
  const { alreadyEmails } = await response.json();
  return alreadyEmails;
};

// Feature: 現在入力しているメアドが既存のメアドリストに含まれているかをチェックし、含まれていればtrue, そうでなければfalseを返す
// Execution Timing: サインアップ画面のemail入力欄の値が変更される度に実行
// Returns: true or false ; boolean
export const isAlready = (watchEmail: string, alreadyEmails: string[]) => {
  for (let alredyEmail of alreadyEmails) {
    if (watchEmail === alredyEmail) {
      return true;
    }
  }
  return false;
};
