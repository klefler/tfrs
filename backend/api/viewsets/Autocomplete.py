from django.http import JsonResponse
from rest_framework.exceptions import NotFound, ValidationError

from rest_framework.viewsets import ViewSet

from api.permissions.Autocomplete import AutocompletePermissions
from api.services.Autocomplete import Autocomplete, NoSuchFieldError


class AutocompleteViewSet(ViewSet):
    permission_classes = (AutocompletePermissions,)
    http_method_names = ['get']

    def list(self, request):
        field = request.GET.get('field')
        q = request.GET.get('q')
        cache_results = request.GET.get('cache', True)
        if cache_results == 'False':
            cache_results = False

        if q:
            q = q.lower()

        if not field or not q:
            raise ValidationError(
                'required query parameter field or q not present')

        try:
            result = Autocomplete.get_matches(field, q, cache_results)
            response = JsonResponse(result, safe=False)
            response['Cache-Control'] = 'max-age=3600'

            return response
        except NoSuchFieldError as e:
            raise NotFound()
