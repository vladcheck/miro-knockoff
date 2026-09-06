import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router";

export default function AppHeader() {
  const { session, logout } = useSession();

  return (
    <header className="bg-background border-b border-border/40 shadow-sm py-3 px-4 mb-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Miro Copy</h1>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout()}
              className="hover:bg-destructive/10"
            >
              Выйти
            </Button>
          </div>
        ) : (
          <Button variant="default" size="sm">
            <Link to={ROUTES.Login}>Войти</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
