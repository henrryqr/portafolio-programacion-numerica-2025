def extraer_coeficientes(expr):
    expr = expr.replace(" ", "").lower()
    if 'x' not in expr:
        raise ValueError("La expresión debe contener 'x'")

    x_index = expr.find('x')
    m = expr[:x_index]
    b = expr[x_index+1:] if x_index+1 < len(expr) else '0'

    if m == '':
        m = '1'
    elif m == '+':
        m = '1'
    elif m == '-':
        m = '-1'

    if b == '':
        b = '0'
    elif b.startswith('+') or b.startswith('-'):
        pass
    else:
        b = '+' + b

    return float(m), float(b)

def pedir_funciones_texto():
    funciones = []
    for i in range(2):
        texto = input(f"Ingrese la función {i+1} (ej: 2x+3 o -x-4): ")
        try:
            funciones.append(extraer_coeficientes(texto))
        except Exception as e:
            print(f"Error: {e}")
            return pedir_funciones_texto()
    return funciones

def graficar_dos_funciones(funciones):
    print("\nGráfico (1 = función 1, 2 = función 2):\n")
    for y in range(10, -11, -1):
        linea = ""
        for x in range(-20, 21):
            simbolo = ' '
            if x == 0 and y == 0:
                simbolo = '+'
            elif x == 0:
                simbolo = '|'
            elif y == 0:
                simbolo = '-'
            for idx, (m, b) in enumerate(funciones):
                yf = m * x + b
                if int(round(yf)) == y:
                    simbolo = str(idx+1)
            linea += simbolo
        print(linea)

if __name__ == "__main__":
    funciones = pedir_funciones_texto()
    graficar_dos_funciones(funciones)
