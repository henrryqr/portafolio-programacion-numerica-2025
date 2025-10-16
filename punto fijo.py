import math

print("METODO DE PUNTO FIJO")
print("====================")

funcion_str = input("Escribe g(x): ")

x0 = float(input("Valor inicial x0: "))

tolerancia = float(input("Tolerancia: "))

max_iter = int(input("Maximo iteraciones: "))

print("\nCalculando...")
print("Iter\tx_nuevo\t\tDiferencia")

x_actual = x0
encontrado = False

for i in range(1, max_iter + 1):
    x_siguiente = eval(funcion_str, {"math": math, "x": x_actual})
    
    dif = abs(x_siguiente - x_actual)
    
    print(f"{i}\t{x_siguiente:.6f}\t{dif:.6f}")
    
    if dif < tolerancia:
        print(f"\nRaiz encontrada: {x_siguiente:.8f}")
        print(f"Iteraciones: {i}")
        encontrado = True
        break
    
    x_actual = x_siguiente

if not encontrado:
    print(f"\nNo converge en {max_iter} iteraciones")
    print(f"Ultimo valor: {x_siguiente:.8f}")

print("Terminado")
