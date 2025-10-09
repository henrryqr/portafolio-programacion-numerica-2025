def limpiar_expresion(texto):
    texto = texto.replace(" ", "")
    texto = texto.replace("^", "**")
    texto = texto.replace("-x", "-1*x").replace("+x", "+1*x")
    if texto[:1] == "x":
        texto = "1*" + texto
    texto = texto.replace("x", "*x").replace("**x", "*x")
    return texto

def valor_funcion(expresion, x):
    try:
        return eval(expresion, {"x": x, "__builtins__": {}})
    except:
        return None

def dibujar(funcA, funcB, rango_x=(-15, 15), rango_y=(-10, 10)):
    x_min, x_max = rango_x
    y_min, y_max = rango_y
    print("\n=== GRÁFICO EN CONSOLA ===\n")

    for y in range(y_max, y_min - 1, -1):
        fila = ""
        for x in range(x_min, x_max + 1):
            yA = valor_funcion(funcA, x)
            yB = valor_funcion(funcB, x)

            toca_A = yA is not None and abs(yA - y) < 0.5
            toca_B = yB is not None and abs(yB - y) < 0.5

            if toca_A and toca_B:
                fila += "#"
            elif toca_A:
                fila += "*"
            elif toca_B:
                fila += "o"
            elif x == 0 and y == 0:
                fila += "+"
            elif x == 0:
                fila += "|"
            elif y == 0:
                fila += "-"
            else:
                fila += " "
        print(fila)

    print("\n[ LEYENDA ]")
    print(" * = Función 1")
    print(" o = Función 2")
    print(" # = Intersección")
    print(" | = Eje Y")
    print(" - = Eje X")
    print(" + = Origen (0,0)\n")

def ejecutar():
    print("PROGRAMA GRAFICADOR ")
    print("==========================\n")

    f1 = input("Función 1 (ejemplo: 2x+1): ")
    f2 = input("Función 2 (ejemplo: -x+3): ")

    f1 = limpiar_expresion(f1)
    f2 = limpiar_expresion(f2)

    dibujar(f1, f2)

if __name__ == "__main__":
    ejecutar()
