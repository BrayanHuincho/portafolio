# Comandos para subir tu proyecto a GitHub

Guardé esta guía para que siempre sepas exactamente qué comandos usar cada vez que quieras guardar cambios nuevos o subir un proyecto nuevo.

## 1. Si estás modificando el Portafolio actual (O ya tienes Repo creado)

Cuando haces cambios en el código de tu web que ya está conectada a GitHub, solo necesitas hacer esto:

```bash
# 1. Agrega todos los archivos nuevos/modificados
git add .

# 2. Crea un punto de guardado (cambia el mensaje por lo que hiciste)
git commit -m "Actualicé la sección de proyectos"

# 3. Sube los cambios a GitHub (Vercel se actualizará automáticamente!)
git push
```

---

## 2. Si estás subiendo un Proyecto TOTALMENTE NUEVO

Si comienzas un proyecto desde cero y quieres subirlo a un repositorio nuevo en GitHub:

```bash
# 1. Inicia Git en tu carpeta
git init

# 2. Agrega los archivos
git add .

# 3. Crea el primer commit
git commit -m "Primer commit - Proyecto inicial"

# 4. Cambia el nombre de la rama principal a 'main'
git branch -M main

# 5. [IMPORTANTE] Conecta tu compu con GitHub (Cambia la URL por tu repo nuevo)
git remote add origin https://github.com/BrayanHuincho/NUEVO-REPO.git

# 6. Sube todo por primera vez
git push -u origin main
```

**Nota para forzar subidas:**
Si alguna vez la consola te da error porque un README u otro archivo se cruzó en la nube y bloquea todo, usa `--force` al final de la primera subida:
`git push -u origin main --force`
