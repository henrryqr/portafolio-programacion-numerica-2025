class Raphson:
    def __init__(self, f_str, x0, tol, n):
        self.f_str, self.x, self.tol, self.n = f_str, x0, tol, n
    def f(self, x): return eval(self.f_str)
    def df(self, x):
        h = 1e-6
        return (self.f(x+h) - self.f(x-h)) / (2*h)
    def calcular(self):
        for i in range(self.n):
            fx, dfx = self.f(self.x), self.df(self.x)
            if dfx == 0: break
            x1 = self.x - fx/dfx
            print(f"Iter {i+1}: x={x1:.6f}, f(x)={fx:.6f}")
            if abs(x1 - self.x) < self.tol:
                print(f"\nRaíz ≈ {x1:.6f}")
                return
            self.x = x1
        print("\nNo converge")

f = input("f(x): ")
x0 = float(input("x0: "))
tol = float(input("tolerancia: "))
n = int(input("iteraciones: "))
Raphson(f, x0, tol, n).calcular()
