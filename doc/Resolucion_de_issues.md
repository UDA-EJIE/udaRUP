Este es el procedimiento que se debe seguir a la hora de corregir incidencias en el proyecto de udaRUP.

En primer lugar se debe de determinar el tipo de modificación que va a resultar de la corrección de la incidencia. Dependiendo del tipo de modificación se tratará de:

* **Error grave en versión productiva**: Es cuando se determina que se está produciendo un error que por su severidad debe de corregirse inmediatamente y tiene como consecuencia una nueva versión correctva del proyecto. 

* **Error que se liberará en la siguiente versión**: Se determina que el error no es tan grave como para liberar una nueva versión correctiva, sino que se incluye entre el resto de correcciones y mejoras para la siguiente versión en la fecha planificada.

* **Nueva funcionalidad**: La incidencia indicada no es un error sino una nueva funcionalidad que se incluye en la liberación de una versión posterior.

El flujo de trabajo en cada una de los tipos de resolución será el siguiente:

## Error grave en versión productiva

En este caso el prodecimiento será el siguiente.

1. Crear una rama hotfix que identifique a la incidencia a partir de la rama *master*.

```bash
$ git checkout master
$ gti checkout -b hotfix-issue56
```

2. Realizar los correctivos necesarios en el proyecto

3. Comitar los cambios a la rama hotfix

```bash
$ git add .
$ git commit -m "Resolución de la issue 54" -m "Se han realizado las siguientes modificaciones para...
>
> Fix #54"
$ git push origin hotfix-issue56
```

4. Incorporar la corrección a la rama *master*

```bash
$ git checkout master
$ git merge --no-ff hotfix-issue56
$ git push origin master
```

5. En caso de que sea necesario incorporar la corrección también a la rama *develop*.

```bash
$ git checkout develop
$ git merge --no-ff hotfix-issue56
$ git push origin develop
```

6. Publicar la nueva versión.


## Error que se liberará en la siguiente versión

Para este tipo de incidencia la idea es realizar una modificación que se liberará en la siguiente versión junto con otros correctivos o nuevas funcionalidades. Por ello, las modificaciones se realizarán sobre la rama *develop*.

En este caso el prodecimiento será el siguiente.

1. Crear una rama fix que identifique a la incidencia a partir de la rama *develop*.

```bash
$ git checkout develop
$ gti checkout -b fix-issue56
```

2. Realizar los correctivos necesarios en el proyecto

3. Comitar los cambios a la rama fix

```bash
$ git add .
$ git commit -m "Resolución de la issue 54" -m "Se han realizado las siguientes modificaciones para...
>
> Fix #54"
$ git push origin fix-issue56
```

4. Incorporar la corrección a la rama *develop*

```bash
$ git checkout develop
$ git merge --no-ff fix-issue56
$ git push origin develop
```

## Nueva funcionalidad

En este caso la indicencia reportada no se traduce en una corrección sino que se incorpora a la nueva versión como una nueva funcionalidad.

El proceso es similar al anterior salvo que se deberá de crear una rama *feat* en vez de *fix* a partir de la rama *develop*.

1. Crear una rama feat que identifique a la incidencia a partir de la rama *develop*.

```bash
$ git checkout develop
$ gti checkout -b feat-multicombo
```

2. Realizar los correctivos necesarios en el proyecto

3. Comitar los cambios a la rama feat

```bash
$ git add .
$ git commit -m "Nueva funcionalidad en el componente RUP combo" -m "Se han realizado las siguientes modificaciones para...
>
>"
$ git push origin feat-multicombo
```

4. Incorporar la corrección a la rama *develop*

```bash
$ git checkout develop
$ git merge --no-ff feat-multicombo
$ git push origin develop
```
