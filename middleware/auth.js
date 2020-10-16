export default function ({ redirect, $fireAuth }) {
  // If the user is not authenticated
  if (!$fireAuth.currentUser) {
    return redirect("/login");
  }
}
